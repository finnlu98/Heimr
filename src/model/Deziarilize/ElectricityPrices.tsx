

class ElectricityPrice {
  time_start!: string
  NOK_per_kWh!: number
}

class ComponentData {
  labels!: string[]
  datasets!: Datasets[]
}

// what?
class Datasets {
  data!: Number[]
  backgroundColor!: string
}