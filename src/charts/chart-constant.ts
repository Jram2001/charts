export interface pieChartAngles{
    start : number,
    end : number,
    color : string
}

export interface pieChartOptions{
    chartType ?: string,
    data : number[],
    colors : string[]
    animationDuration ?: number
}