<script>
    import Chart from "../../../Components/Chart.svelte";
    
    let chartType = 'bar';
    export let title = "";
    export let tierAData = [10,23,2,12,19];
    export let tierBData = [8,10,6,18,5];
    export let tierCData = [13,16,10,4,10];
    export let tierSData = [22,4,5,10,19];
    export let tierXData = [12,15,0,3,1];
    export let labels = ["Jan", "Feb", "Mar", "Apr", "May"];
    let maxValue = 0;

    $: barData.labels = [...labels];
    $: labels.map((label, i) => {
      const total = tierSData[i] + tierAData[i] + tierBData[i] + tierCData[i] + tierXData[i];
      maxValue = total > maxValue ? total : maxValue;
      if ( i + 1 === labels.length) {
        chartOptions.scales.y.max = maxValue + 5;
      }
    })
    
    let barData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'A tier ',
                backgroundColor: '#4F46E5',
                borderColor: '#4F46E5',
                borderWidth: 0,
                data: tierAData,
            },{
                label: 'B tier ',
                backgroundColor: '#FBBF24',
                borderColor: '#FBBF24',
                borderWidth: 0,
                data: tierBData,
            },
            {
                label: 'C tier ',
                backgroundColor: '#DB2777',
                borderColor: '#DB2777',
                borderWidth: 0,
                data: tierCData,
            },
            {
                label: 'S tier ',
                backgroundColor: '#059669',
                borderColor: '#059669',
                borderWidth: 0,
                data: tierSData,
            },
            {
                label: 'X tier ',
                backgroundColor: '#D1D5DB',
                borderColor: '#D1D5DB',
                borderWidth: 0,
                data: tierXData,
            }
        ],
    };
  
    let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Position legend at the bottom
        align: 'start', // Align legend to the start (left)
        labels: {
          boxWidth: 12, // Width of the color box in legend
          padding: 20, // Add padding around legend items
        },
      },
      title: {
        display: true,
        text: title, // Title text
        font: {
          size: 16, // Font size for the title
          weight: 500
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        align: 'start', // Position the title in the center
      },
      tooltip: {
        // Customize tooltip if needed
      },
    },
    scales: {
      x: {
        stacked: true,
        barPercentage: 0.4, 
        categoryPercentage: 0.4,
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        barPercentage: 0.4, 
        categoryPercentage: 0.4,
        min: 0, // Set the minimum value for the y-axis
        max: 100, // Set the max value for the y-axis
        grid: {
          display: true, // Keep horizontal grid lines
        },
      },
    },
  };
  </script>
  
  <Chart type={chartType} data={barData} options={chartOptions} />
  