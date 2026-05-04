import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import Konva from 'https://esm.sh/konva@10.2.5';

const { createElement: h } = React;
const lessonCards = [...document.querySelectorAll('.lesson-card')];
const colours = ['#111827', '#dc2626', '#2563eb', '#059669', '#7c3aed', '#ea580c'];
const oldBoardCssName = ['tl', 'draw'].join('');

document.querySelectorAll(`link[href*="${oldBoardCssName}"]`).forEach((link) => link.remove());

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'lesson';
}

function toStagePoint(stage) {
  const pointer = stage.getPointerPosition();
  const transform = stage.getAbsoluteTransform().copy().invert();
  return transform.point(pointer);
}

function DemoBoard({ boardKey }) {
  const hostRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const strokesRef = useRef([]);
  const activeStrokeRef = useRef(null);
  const toolRef = useRef('pen');
  const colourRef = useRef(colours[0]);
  const sizeRef = useRef(4);
  const [tool, setTool] = useState('pen');
  const [colour, setColour] = useState(colours[0]);
  const [size, setSize] = useState(4);
  const [zoom, setZoom] = useState(100);

  const storageKey = `unit-1-methods-board-${boardKey}`;

  function save() {
    const stage = stageRef.current;
    if (!stage) return;
    localStorage.setItem(storageKey, JSON.stringify({
      strokes: strokesRef.current,
      scale: stage.scaleX(),
      position: stage.position()
    }));
  }

  function drawStroke(stroke) {
    const line = new Konva.Line({
      points: stroke.points,
      stroke: stroke.tool === 'eraser' ? '#000' : stroke.colour,
      strokeWidth: stroke.size,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0.25,
      globalCompositeOperation: stroke.tool === 'eraser' ? 'destination-out' : 'source-over'
    });
    layerRef.current.add(line);
    return line;
  }

  function redraw() {
    const layer = layerRef.current;
    layer.destroyChildren();
    strokesRef.current.forEach(drawStroke);
    layer.batchDraw();
  }

  useEffect(() => {
    toolRef.current = tool;
    colourRef.current = colour;
    sizeRef.current = size;
  }, [tool, colour, size]);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    const host = hostRef.current;
    const stage = new Konva.Stage({
      container: host,
      width: host.clientWidth,
      height: host.clientHeight,
      draggable: false
    });
    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;

    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved) {
      strokesRef.current = Array.isArray(saved.strokes) ? saved.strokes : [];
      if (saved.scale) stage.scale({ x: saved.scale, y: saved.scale });
      if (saved.position) stage.position(saved.position);
      setZoom(Math.round(stage.scaleX() * 100));
      redraw();
    }

    function resize() {
      stage.width(host.clientWidth);
      stage.height(host.clientHeight);
      stage.batchDraw();
    }

    function startStroke(event) {
      if (toolRef.current === 'pan') return;
      event.evt.preventDefault();
      const point = toStagePoint(stage);
      const pressure = event.evt.pressure && event.evt.pressure > 0 ? event.evt.pressure : 0.7;
      const stroke = {
        tool: toolRef.current,
        colour: colourRef.current,
        size: Math.max(2, Math.round(sizeRef.current * pressure)),
        points: [point.x, point.y, point.x, point.y]
      };
      stroke.shape = drawStroke(stroke);
      activeStrokeRef.current = stroke;
    }

    function continueStroke(event) {
      if (!activeStrokeRef.current) return;
      event.evt.preventDefault();
      const point = toStagePoint(stage);
      const stroke = activeStrokeRef.current;
      stroke.points = stroke.points.concat([point.x, point.y]);
      stroke.shape.points(stroke.points);
      layer.batchDraw();
    }

    function endStroke(event) {
      if (!activeStrokeRef.current) return;
      event.evt.preventDefault();
      const stroke = activeStrokeRef.current;
      delete stroke.shape;
      strokesRef.current.push(stroke);
      activeStrokeRef.current = null;
      save();
    }

    function zoomBoard(event) {
      event.evt.preventDefault();
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      };
      const direction = event.evt.deltaY > 0 ? -1 : 1;
      const scaleBy = 1.08;
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const clamped = Math.min(4, Math.max(0.25, newScale));
      stage.scale({ x: clamped, y: clamped });
      stage.position({
        x: pointer.x - mousePointTo.x * clamped,
        y: pointer.y - mousePointTo.y * clamped
      });
      setZoom(Math.round(clamped * 100));
      save();
    }

    stage.on('pointerdown', startStroke);
    stage.on('pointermove', continueStroke);
    stage.on('pointerup pointercancel pointerleave', endStroke);
    stage.on('wheel', zoomBoard);
    stage.on('dragend', save);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      stage.destroy();
    };
  }, [storageKey]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.draggable(tool === 'pan');
    stage.container().style.cursor = tool === 'pan' ? 'grab' : 'crosshair';
  }, [tool]);

  function undo() {
    strokesRef.current.pop();
    redraw();
    save();
  }

  function clearBoard() {
    strokesRef.current = [];
    redraw();
    save();
  }

  function resetView() {
    const stage = stageRef.current;
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    setZoom(100);
    save();
  }

  return h('div', { className: 'konva-board' },
    h('div', { className: 'board-toolbar', role: 'toolbar', 'aria-label': 'Teacher demo canvas tools' },
      ['pen', 'eraser', 'pan'].map((value) =>
        h('button', {
          key: value,
          type: 'button',
          className: tool === value ? 'is-active' : '',
          onClick: () => setTool(value)
        }, value)
      ),
      h('div', { className: 'board-swatches', 'aria-label': 'Ink colour' },
        colours.map((value) =>
          h('button', {
            key: value,
            type: 'button',
            className: colour === value ? 'is-active' : '',
            style: { '--swatch': value },
            'aria-label': `Use ${value}`,
            onClick: () => setColour(value)
          })
        )
      ),
      h('label', { className: 'board-size' },
        h('span', null, 'Thickness'),
        h('input', {
          type: 'range',
          min: '2',
          max: '18',
          value: size,
          onChange: (event) => setSize(Number(event.target.value))
        })
      ),
      h('button', { type: 'button', onClick: undo }, 'undo'),
      h('button', { type: 'button', onClick: resetView }, `${zoom}%`),
      h('button', { type: 'button', onClick: clearBoard }, 'clear')
    ),
    h('div', { ref: hostRef, className: 'konva-host', 'aria-label': 'Stylus-compatible teacher canvas' })
  );
}

function makeBoard(card, index) {
  const title = card.querySelector('h3')?.textContent?.trim() || `Lesson section ${index + 1}`;
  const details = document.createElement('details');
  details.className = 'demo-board';
  details.innerHTML = `
    <summary>
      Teacher demo canvas: ${title}
      <span>Expandable whiteboard. Stylus, touch, mouse, pan, zoom, erase, undo, clear, and saved board state are available.</span>
    </summary>
    <div class="demo-board-shell">
      <div class="demo-board-mount" data-board-id="${index}" aria-label="Teacher demo canvas for ${title}"></div>
    </div>
  `;
  card.insertAdjacentElement('afterend', details);

  details.addEventListener('toggle', () => {
    if (!details.open || details.dataset.mounted === 'true') return;
    const mount = details.querySelector('.demo-board-mount');
    try {
      createRoot(mount).render(h(DemoBoard, {
        boardKey: `${index}-${slugify(title)}`
      }));
      details.dataset.mounted = 'true';
    } catch (error) {
      mount.innerHTML = '<div class="demo-board-fallback">The whiteboard could not load. Check the internet connection and refresh this page.</div>';
    }
  });
}

lessonCards.forEach(makeBoard);
