<script>
    import Chart from "../../../Components/Chart.svelte";

    let chartType = 'line';
    export let title = "";
    export let tierOneData = [3,5,1,6,9,2,4,0,3,7];
    export let tierTwoData = [6,7,2,6,9,8,7,3,4,6];
    export let tierThreeData = [1,2,3,8,7,6,4,7,2,6];
    export let labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $: chartData.labels = labels;
    
    let chartData = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Tier 1',
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
        borderWidth: 3,
        data: tierOneData,
      },{
        label: 'Tier 2',
        backgroundColor: '#FBBF24',
        borderColor: '#FBBF24',
        borderWidth: 3,
        data: tierTwoData,
      },
      {
        label: 'Tier 3',
        backgroundColor: '#DB2777',
        borderColor: '#DB2777',
        borderWidth: 3,
        data: tierThreeData,
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
        display: false,
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
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        min: 0, // Set the minimum value for the y-axis
        max: Math.max(...tierOneData, ...tierTwoData, ...tierThreeData) + 5, // Set the mdax value for the y-axis
        grid: {
          display: true, // Keep horizontal grid lines
        },
      },
    },
  };
</script>

<Chart type={chartType} data={chartData} options={chartOptions} />
