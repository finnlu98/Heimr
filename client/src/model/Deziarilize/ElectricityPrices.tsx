export class ElectricityPrice {
  time_start!: string
  NOK_per_kWh!: number
}

export class ComponentData {
  labels: string[]
  datasets: Datasets[]

  constructor(labels: string[], datasets: Datasets[]) {
    this.labels = labels;
    this.datasets = datasets;
  }

}

export class Datasets {
  data: Number[]
  backgroundColor: string

  constructor(data: number[]) {
    this.data = data;
    this.backgroundColor = 'rgba(0, 184, 241, 0.8)';
  }
}