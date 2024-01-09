import { EventRenderedArgs, View } from '@syncfusion/ej2-schedule';

/**
 * Schedule util
 */

export function applyCategoryColor(
  args: EventRenderedArgs,
  currentView: View
): void {
  const categoryColor: string = args.data.CategoryColor as string;
  if (!args.element || !categoryColor) {
    return;
  }
  if (currentView === 'Agenda') {
    (args.element.firstChild as HTMLElement).style.borderLeftColor =
      categoryColor;
  } else {
    args.element.style.backgroundColor = categoryColor;
  }
}
