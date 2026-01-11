import { useEffect, useState, type CSSProperties } from 'react';
import { getTransitionAttributes, useTransitionStatus } from '../../../utils/transitionStatus';
import { useFetchReports } from '../../../api/reports';
import { useFetchUnits } from '../../../api/units';
import type { Report, Unit } from '../../../types/types';
import { useUnitStore } from '../../../zustand/userUnit';
import styles from './Content.module.scss';
import { ContentBody } from './ContentBody/ContentBody';
import { ContentHeader } from './ContentHeader/ContentHeader';
import { isEmpty } from 'lodash';
import { ZTyphography } from '../../../components/ZTypography/ZTypography';

const AMOUT_OF_UNITS = 6;

export const Content = () => {
    const units = useFetchUnits();
    const { screenUnit } = useUnitStore();
    const [reports, setReports] = useState<Report[]>(useFetchReports())
    const [carrouselIndex, setCarrouselIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

    const childrenToDisplay = units.filter(unit => unit.parentId === screenUnit.id
        && unit.status.id === 1
        && unit.status.visibility === 'visible');
    const totalUnits = childrenToDisplay.length;
    const getMaxStartIndex = (count: number) => Math.max(0, count - AMOUT_OF_UNITS);
    const clampIndex = (index: number, count: number) => (
        Math.min(Math.max(0, index), getMaxStartIndex(count))
    );
    const maxStartIndex = getMaxStartIndex(totalUnits);
    const getCarouselSlice = (items: Unit[], index: number) => {
        if (items.length === 0) {
            return [];
        }

        const clampedIndex = clampIndex(index, items.length);
        return items.slice(clampedIndex, clampedIndex + AMOUT_OF_UNITS);
    }
    const clampedIndex = clampIndex(carrouselIndex, totalUnits);
    const childrenCarrousel = getCarouselSlice(childrenToDisplay, clampedIndex);
    const canGoPrev = clampedIndex > 0;
    const canGoNext = clampedIndex < maxStartIndex;
    const showCarrousel = totalUnits > AMOUT_OF_UNITS;
    const visibleCount = Math.max(1, Math.min(totalUnits, AMOUT_OF_UNITS));
    const { transitionStatus } = useTransitionStatus(carrouselIndex);
    const transitionProps = {
        ...getTransitionAttributes(transitionStatus),
        'data-slide-direction': slideDirection
    };
    const contentStyle: CSSProperties = {
        ['--carousel-count' as keyof CSSProperties]: visibleCount
    };

    useEffect(() => {
        setCarrouselIndex(prev => clampIndex(prev, totalUnits));
    }, [totalUnits]);

    return isEmpty(childrenToDisplay)
        ? <div className={styles.NoUnits}>
            <ZTyphography>אין יחידות להצגה</ZTyphography>
        </div>
        : <div className={styles.Content} style={contentStyle}>
            <ContentHeader
                childrenToDisplay={childrenCarrousel}
                setReports={setReports}
                reports={reports}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                showCarrousel={showCarrousel}
                transitionProps={transitionProps}
                onCarrouselStep={(step, direction) => {
                    setSlideDirection(direction);
                    setCarrouselIndex(prev => clampIndex(prev + step, totalUnits));
                }} />
            <ContentBody childrenToDisplay={childrenCarrousel}
                transitionProps={transitionProps}
                reports={reports} />
        </div>
}
