import { Dialog, DialogActions, DialogBody, DialogTitle } from "../base/dialog";
import { Input } from "../base/input";
import { Button } from "../base/button";
import { useRef } from "react";
import { Form } from "react-router";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NewClassModal({ open, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog onClose={onClose} open={open}>
      <Form
        ref={formRef}
        method="post"
        action="/classes/new"
        onSubmit={onClose}
      >
        <DialogTitle>Create Class</DialogTitle>
        <DialogBody>
          <Input type="text" required name="subject" placeholder="Subject" />
        </DialogBody>
        <DialogActions>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button color="green" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
