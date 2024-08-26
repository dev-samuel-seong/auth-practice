import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style["home"]}>
      <button className={style["button"]}>카카오</button>
      <button className={style["button"]}>네이버</button>
      <button className={style["button"]}>구글</button>
      <button className={style["button"]}>이메일</button>
      <button className={style["button"]}>로그아웃</button>
    </div>
  );
}
