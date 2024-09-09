import style from "./loadingSpinner.module.scss";

export type FetchStateType =
  | "INIT"
  | "LOADING"
  | "SUCCESS"
  | "FAIL"
  | "EMPTY"
  | "SEARCH"
  | "DISABLE";

export default function LoadingSpinner({
  color,
  padding,
}: {
  color?: "white";
  padding?: string;
}) {
  return (
    <div className={style["loading"]} style={{ padding }}>
      <div
        className={`${style["lds-ring"]} ${
          color === "white" && style["white"]
        }`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
