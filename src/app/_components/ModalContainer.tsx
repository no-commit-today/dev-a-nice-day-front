import styles from "./ModalContainer.module.css";
export default function ModalContainer({
  children,
  backgroundColor = "rgba(0, 0, 0, 0.5)",
}: {
  children?: React.ReactNode;
  backgroundColor?: string;
}) {
  return (
    <div className={styles.container} style={{ backgroundColor }}>
      {children}
    </div>
  );
}
