import { TreeData } from 'element-ui/types/tree'

export interface SelectData {
  value: string | number | string[] | number[] | undefined;
  label: string | string[];
}

export interface TreeSelectData extends TreeData {
  choose: boolean;
}
