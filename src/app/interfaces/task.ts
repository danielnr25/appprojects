export const taskStatusList: string[] = [
  'Pendiente',
  'En proceso',
  'Completado',
];

export const taskPriorityList: string[] = [
  'Low',
  'Normal',
  'High',
];

export type TaskPriority = (typeof taskPriorityList)[number];

export type TaskStatus = (typeof taskStatusList)[number];

export type Task = {
  //activities: Activity[],
  id?: number
  text: string,
  description: string,
  startDate: string | Date | number,
  endDate?: Date,
  company: string,
  priority: TaskPriority,
  dueDate: string | Date | number,
  status: TaskStatus,
};


export const newTask: Task = {
  id: 0,
  text: '',
  description: '',
  company: '',
  priority: 'Low',
  startDate: new Date(),
  dueDate: new Date(),
  status: 'Pendiente'
};
