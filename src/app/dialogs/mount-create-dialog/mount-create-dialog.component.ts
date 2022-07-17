import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { DialogRef } from "soundcore-ngx";
import { ApiResponse, SCDKMountService, Mount, CreateResult } from "soundcore-sdk";

export interface MountCreateDialogOptions {
    bucketId?: string;
    mode?: "create" | "edit";
    data?: Mount;
}

@Component({
    templateUrl: "./mount-create-dialog.component.html"
})
export class AppMountCreateDialog implements OnDestroy {

    constructor(
        public readonly dialogRef: DialogRef<MountCreateDialogOptions, Mount>,
        private readonly mountService: SCDKMountService,
    ) {}

    private readonly _destroy: Subject<void> = new Subject();

    public readonly form: FormGroup = new FormGroup({
        name: new FormControl<string>(this.dialogRef.config.data?.data?.name, {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(32)
            ]
        }),
        directory: new FormControl(null, {
            validators: [
                Validators.minLength(1),
                Validators.maxLength(4095)
            ]
        }),
        setAsDefault: new FormControl(this.dialogRef.config.data?.data?.isDefault),
        doScan: new FormControl(false)
    })

    public loading: boolean = false;
    public errorMessage: string;

    public async submit() {
        if(this.loading) return;
        this.form.markAllAsTouched();
        if(this.form.invalid) return;

        this.loading = true;


        // Handle editor mode == "edit"
        if(this.dialogRef.config.data.mode == "edit") {
            this.mountService.update(this.dialogRef.config.data.data?.id, {
                name: this.form.get("name").value,
                setAsDefault: this.form.get("setAsDefault").value,
                doScan: this.form.get("doScan").value
            }).pipe((takeUntil(this._destroy))).subscribe((response) => {
                this.loading = false;
                if(response.error) {
                    this.errorMessage = response.message;
                    return;
                }

                this.dialogRef.close(response.payload);
            })
            return;
        }

        // Handle editor mode == "create"
        this.mountService.create({
            name: this.form.get("name").value,
            bucketId: this.dialogRef.config.data.bucketId,
            directory: this.form.get("directory").value,
            setAsDefault: this.form.get("setAsDefault").value,
            doScan: this.form.get("doScan").value
        }).pipe(takeUntil(this._destroy)).subscribe((response: ApiResponse<CreateResult<Mount>>) => {
            this.loading = false;

            if(response.error) {
                this.errorMessage = response.message;
                return;
            }

            if(!response.payload.existed) {
                this.dialogRef.close(response.payload.data);
            } else {
                this.dialogRef.close(null);
            }
        })
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

}