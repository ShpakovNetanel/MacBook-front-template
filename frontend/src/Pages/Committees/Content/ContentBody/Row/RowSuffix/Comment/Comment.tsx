import { Dialog } from "@base-ui-components/react";
import { MessageCircleMore, Save, Trash, X } from "lucide-react";
import { useState } from "react";
import { ZTyphography } from "../../../../../../../components/ZTypography/ZTypography";
import type { Report } from "../../../../../../../types/types";
import styles from './Comment.module.scss';

type CommentProps = {
    report: Report
}

export const Comment = ({ report }: CommentProps) => {
    const [message, setMessage] = useState(report?.comment);

    const saveComment = () => {
    }

    const removeComment = () => {

    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className={styles.Button}>
                <MessageCircleMore className={styles.Icon}/>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.Backdrop} />
                <Dialog.Popup className={styles.Popup}>
                    <div className={styles.Title}>
                        <div className={styles.Text}>
                            <ZTyphography slotProps={{
                                classes: {
                                    Label: styles.Id
                                }
                            }}>{`הערה עבור מק״ט: ${report.material.id}`}</ZTyphography>
                            <ZTyphography slotProps={{
                                classes: {
                                    Label: styles.Description
                                }
                            }}>{report.material.description}</ZTyphography>
                        </div>
                        <Dialog.Close className={styles.Close}>
                            <X />
                        </Dialog.Close>
                    </div>
                    <div className={styles.Content}>
                        <textarea
                            className={styles.Message}
                            placeholder={'כתוב כאן...'}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </div>
                    <div className={styles.Footer}>
                        <ZTyphography slotProps={{
                            classes: {
                                Label: styles.Length
                            }
                        }}>{`אורך ${message.length}/120`}</ZTyphography>
                        <div className={styles.Actions}>
                            <Dialog.Close className={styles.Button} onClick={removeComment}>
                                <Trash />
                            </Dialog.Close>
                            <Dialog.Close className={styles.Button} onClick={saveComment}>
                                <Save />
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}