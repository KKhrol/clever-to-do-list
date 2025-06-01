import type React from 'react';
import { useCallback } from 'react';

interface DragHandlerProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useDragHandler = ({ scrollContainerRef }: DragHandlerProps) => {
  const handleCanvasDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        document.body.style.cursor = 'grabbing';
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Скорость скролла
        container.scrollLeft = scrollLeft - walk;
      };

      const onMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      onMouseDown(e.nativeEvent);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return handleCanvasDrag;
};
