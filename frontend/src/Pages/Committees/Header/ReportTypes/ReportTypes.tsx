import type { CSSProperties } from "react";
import { ZStep } from "../../../../components/ZStepper/ZStep/ZStep";
import { ZStepConnector } from "../../../../components/ZStepper/ZStepConnector/ZStepConnector";
import { ZStepIndicator } from "../../../../components/ZStepper/ZStepIndicator/ZStepIndicator";
import { ZStepLabel } from "../../../../components/ZStepper/ZStepLabel/ZStepLabel";
import { ZStepper } from "../../../../components/ZStepper/ZStepper";
import { REPORT_TYPES } from "../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../zustand/reportType";
import styles from './ReportTypes.module.scss';

type Step = {
    value: number;
    label: string;
}

const steps: Step[] = [
    { label: 'שצ״ל', value: 2 },
    { label: 'מלאי', value: 1 },
    { label: 'דרישות', value: 0 },
    { label: 'הקצאות', value: 3 }];

export const ReportTypes = () => {
    const updateReportType = useReportTypeStore(s => s.updateReportType);

    return (
        <ZStepper setActiveStep={updateReportType} defaultActive={0} orientation="horizontal">
            {steps.map((step, index) => (
                <ZStep key={index} index={index}
                    slotProps={{
                        classes: {
                            Step: styles.Step
                        },
                        style: {
                            '--step-color': REPORT_TYPES.colorsFunctions.getPrimary(step.value)
                        } as CSSProperties
                    }}>
                    <ZStepIndicator
                        slotProps={{
                            classes: {
                                Indicator: styles.Indicator,
                                Icon: styles.Icon
                            }
                        }} />
                    <ZStepLabel
                        slotProps={{
                            classes: {
                                Label: styles.Label
                            }
                        }}>
                        {step.label}
                    </ZStepLabel>
                    {index !== steps.length - 1 &&
                        <ZStepConnector slotProps={{
                            classes: {
                                Connector: styles.Connector
                            }
                        }} />
                    }
                </ZStep>
            ))}
        </ZStepper>
    );
}