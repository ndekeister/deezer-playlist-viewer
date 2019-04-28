import { of } from "rxjs";

export class MatDialogStub {
    open() {
        return {
            afterClosed: () => of({})
        }
    }
}