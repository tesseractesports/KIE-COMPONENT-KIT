<script>
    import { onMount, onDestroy } from 'svelte';
    import {
      Chart,
      // Controllers
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      // Elements
      BarElement,
      LineElement,
      PointElement,
      ArcElement,
      // Scales
      LinearScale,
      CategoryScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      // Plugins
      Title,
      Tooltip,
      Legend,
      Filler,
      SubTitle
    } from 'chart.js';
  
    // Register all components
    Chart.register(
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      BarElement,
      LineElement,
      PointElement,
      ArcElement,
      LinearScale,
      CategoryScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Title,
      Tooltip,
      Legend,
      Filler,
      SubTitle
    );
  
  
    // Custom plugin for center text
    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: (chart) => {
        if (chart.config.type === 'doughnut') {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const fontSize = (height / 114).toFixed(2);
          const text = `${total}`;
          ctx.restore();
          ctx.font = `${fontSize}em sans-serif`;
          ctx.textBaseline = 'middle';
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    };
  
    Chart.register(centerTextPlugin);
  
    export let type = 'bar'; 
    export let data = {}; 
    export let options = {}; 
  
    let chartInstance;
    let canvas;
  
    const resizeListener = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };
  
    onMount(() => {
      chartInstance = new Chart(canvas, {
        type,
        data,
        options,
      });
      window.addEventListener('resize', resizeListener);
    });
  
    onDestroy(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      window.removeEventListener('resize', resizeListener);
    });
  
    $: if (chartInstance) {
      chartInstance.config.data = data;
      chartInstance.config.options = options;
      chartInstance.update();
    }
  </script>
  
  <div class="chart-container">
    <canvas bind:this={canvas}></canvas>
  </div>
  
  <style>
    canvas {
      display: block;
      width: 100% !important;
      height: auto !important;
    }
  
    .chart-container {
      width: 100%;
      height: 100%; 
      position: relative;
    }
  </style>
  