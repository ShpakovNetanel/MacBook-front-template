import { useState } from 'react';
import { useFetchReports } from '../../../api/reports';
import { useFetchUnits } from '../../../api/units';
import type { Report } from '../../../types/types';
import { useUnitStore } from '../../../zustand/userUnit';
import styles from './Content.module.scss';
import { ContentBody } from './ContentBody/ContentBody';
import { ContentHeader } from './ContentHeader/ContentHeader';
import { isEmpty } from 'lodash';
import { Typhography } from '../../../components/Typography/Typography';
import { useCarousel } from './useCarousel';
import { UNIT_STATUSES } from '../../../utils/MainConstants/UnitStatuses';

const AMOUNT_OF_UNITS = 6;

export const Content = () => {
    const units = useFetchUnits();
    const { screenUnit } = useUnitStore();
    const [reports, setReports] = useState<Report[]>(useFetchReports())

    const childrenToDisplay = units.filter(unit => unit.parent?.id === screenUnit.id
        && unit.status.id === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id
        && unit.status.visibility === 'visible');
        
    const {
        visibleItems: childrenCarrousel,
        canGoPrev,
        canGoNext,
        showCarousel,
        transitionProps,
        contentStyle,
        onStep,
    } = useCarousel(childrenToDisplay, AMOUNT_OF_UNITS);

    return isEmpty(childrenToDisplay)
        ? <div className={styles.NoUnits}>
            <Typhography>אין יחידות להצגה</Typhography>
        </div>
        : <div className={styles.Content} style={contentStyle}>
            <ContentHeader
                childrenToDisplay={childrenCarrousel}
                setReports={setReports}
                reports={reports}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                showCarrousel={showCarousel}
                transitionProps={transitionProps}
                onCarrouselStep={onStep} />
            <ContentBody childrenToDisplay={childrenCarrousel}
                transitionProps={transitionProps}
                reports={reports} />
        </div>
}
