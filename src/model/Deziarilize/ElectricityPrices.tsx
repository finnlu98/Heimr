export class ElectricityPrice {
  time_start!: string
  NOK_per_kWh!: number
}

export class ComponentData {
  labels!: string[]
  datasets!: Datasets[]
}

class Datasets {
  data!: Number[]
  backgroundColor!: string
}