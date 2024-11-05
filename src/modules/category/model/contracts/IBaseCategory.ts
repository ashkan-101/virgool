import StatusCategory from "./StatusCategory"

export default interface IBaseCategory {
  title: string
  status: StatusCategory
  createdAt: Date
  updatedAt: Date
}