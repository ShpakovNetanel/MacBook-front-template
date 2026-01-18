import { useState, type CSSProperties } from 'react';
import { getTransitionAttributes, useTransitionStatus } from '../../../utils/transitionStatus';
import type { Unit } from '../../../types/types';

type SlideDirection = 'left' | 'right';

const clampIndex = (index: number, count: number, pageSize: number) => {
    const maxStartIndex = Math.max(0, count - pageSize);
    return Math.min(Math.max(0, index), maxStartIndex);
};

export const useCarousel = (items: Unit[], pageSize: number) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<SlideDirection>('right');

    const totalItems = items.length;
    const maxStartIndex = Math.max(0, totalItems - pageSize);
    const clampedIndex = clampIndex(carouselIndex, totalItems, pageSize);
    const visibleItems = totalItems === 0
        ? []
        : items.slice(clampedIndex, clampedIndex + pageSize);
    const visibleCount = Math.max(1, Math.min(totalItems, pageSize));
    const { transitionStatus } = useTransitionStatus(clampedIndex);
    const transitionProps = {
        ...getTransitionAttributes(transitionStatus),
        'data-slide-direction': slideDirection
    };
    const contentStyle: CSSProperties = {
        ['--carousel-count' as keyof CSSProperties]: visibleCount
    };

    const onStep = (step: number, direction: SlideDirection) => {
        setSlideDirection(direction);
        setCarouselIndex((prev) => clampIndex(prev + step, totalItems, pageSize));
    };

    return {
        visibleItems,
        canGoPrev: clampedIndex > 0,
        canGoNext: clampedIndex < maxStartIndex,
        showCarousel: totalItems > pageSize,
        transitionProps,
        contentStyle,
        onStep,
    };
};
