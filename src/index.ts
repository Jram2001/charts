import { pieChart } from "./charts/pie-chart";
import { pieChartOptions } from "./charts/chart-constant";
const charts = {
    pieChart : pieChart
}
export function intializeChart(element:HTMLCanvasElement , chartOptions : pieChartOptions){
    if(chartOptions.chartType && charts[chartOptions.chartType as keyof typeof charts]){
        charts[chartOptions.chartType as keyof typeof charts](element , chartOptions);
    }else{
        console.error('Provide a valide chart name');
    }
    console.log('consoled')
} 

// Expose the function globally 
(window as any).initializeChart = intializeChart;
