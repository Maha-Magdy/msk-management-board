import { Priority, Source, Status, Type } from "./suggestion";

export interface Filters {
  type?: Type;
  status?: Status;
  priority?: Priority;
  source?: Source;
  search?: string;
}