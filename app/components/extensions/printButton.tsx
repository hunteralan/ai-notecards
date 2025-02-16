import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../base/button";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";

type Props = { title: string } & (
  | {
      newWindow?: false;
    }
  | {
      newWindow: true;
      href: string;
    }
);

export function PrintButton({ title, ...props }: Props) {
  const print = useCallback(() => {
    if (window) {
      window.print();
    }
  }, []);

  return (
    <Button
      target={props.newWindow ? "_blank" : undefined}
      onClick={!props.newWindow ? print : undefined}
      href={props.newWindow ? props.href : undefined}
    >
      <FontAwesomeIcon icon={faPrint} />
      Print Notecards
    </Button>
  );
}
