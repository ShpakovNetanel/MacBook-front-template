import { Typhography } from '../../../../components/Typography/Typography';
import { MaterialSearch } from './MaterialSearch/MaterialSearch';
import styles from './ContentHeader.module.scss';
import type { Report, Unit } from '../../../../types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ContentHeaderProps = {
    childrenToDisplay: Unit[];
    setReports: React.Dispatch<React.SetStateAction<Report[]>>;
    reports: Report[];
    canGoPrev: boolean;
    canGoNext: boolean;
    showCarrousel: boolean;
    onCarrouselStep: (step: number, direction: 'left' | 'right') => void;
    transitionProps: Record<string, string>;
}

export const ContentHeader = ({ childrenToDisplay, setReports, reports,
    canGoPrev,
    canGoNext,
    showCarrousel,
    onCarrouselStep,
    transitionProps
}: ContentHeaderProps) => {
    return (
        <div className={styles.Header}>
            <MaterialSearch setReports={setReports} reports={reports} />
            <div className={styles.Units}>
                {showCarrousel && (
                    <ChevronLeft
                        className={styles.ArrowLeft}
                        data-disabled={!canGoNext}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={canGoNext ? () => onCarrouselStep(1, 'left') : undefined} />
                )}
                <div className={styles.UnitLabels} {...transitionProps}>
                    {childrenToDisplay.map((unit, index) => (
                        <Typhography key={index} slotProps={{
                            classes: {
                                Label: styles.UnitDescription
                            }
                        }}>
                            {unit.description}
                        </Typhography>
                    ))}
                </div>
                {showCarrousel && (
                    <ChevronRight
                        className={styles.ArrowRight}
                        data-disabled={!canGoPrev}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={canGoPrev ? () => onCarrouselStep(-1, 'right') : undefined} />
                )}
            </div>
            <div className={styles.SuffixSpacer} />
        </div>
    )
}
