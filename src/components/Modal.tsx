import style from "./modal.module.scss";

import { useRef } from "react";

type ModalProps = {
  title?: string;
  subTitle?: string | JSX.Element;
  isVisible: boolean;
  confirm?: string;
  cancel?: string | true;
  onConfirm: () => void;
  onCancel?: () => void;
  customModalStyle?: any;
  innerComponent?: JSX.Element;
};

export default function Modal(props: ModalProps) {
  const {
    isVisible,
    onConfirm,
    onCancel,
    title,
    subTitle,
    confirm,
    cancel,
    customModalStyle,
    innerComponent = undefined,
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  return isVisible ? (
    <div className={style["modal-background"]} ref={modalBackgroundRef}>
      <div
        className={style["modal-container"]}
        style={customModalStyle}
        ref={modalRef}>
        <div
          className={style["modal-title-wrap"]}
          style={{ marginBottom: innerComponent ? 20 : 0 }}>
          {title && <h4 className={style["modal-title"]}>{title}</h4>}
          {subTitle && <p className={style["modal-subtitle"]}>{subTitle}</p>}
        </div>
        {innerComponent && (
          <div className={style["inner-component"]}>{innerComponent}</div>
        )}
        <div className={style["button-wrap"]}></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
