import { ReactElement } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: ReactElement;
}

interface GridLayoutProps {
  items: GridItem[];
  onLayoutChange?: (layout: any) => void;
}

export const GridLayout = ({ items, onLayoutChange }: GridLayoutProps) => {
  const layouts = {
    lg: items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })),
  };

  return (
    <div className="h-full w-full p-4">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        isResizable={true}
        isDraggable={true}
      >
        {items.map((item) => (
          <div key={item.i} className="bg-white rounded-lg shadow-md p-4">
            {item.component}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
