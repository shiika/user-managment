import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from "@angular/core";
import { NgControl } from "@angular/forms";
// import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "[inputValidator]",
  standalone: true
})
export class InputValidatorDirective implements AfterViewChecked {
  @Input() formControlName: string | undefined;
  private messageElement: HTMLElement | null = null;
  private messageContent: string = "";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl,
    // private translate: TranslateService
  ) {}

  @HostListener("input") onInputInput() {
    this.validateInput();
  }

  ngAfterViewChecked(): void {
    this.validateInput();
  }

  private validateInput() {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    // Remove existing message element if any
    if (this.messageElement) {
      this.renderer.removeChild(inputElement.parentNode, this.messageElement);
      this.messageElement = null;
    }

    // Check the length of the input value
    if (
      this.control?.errors &&
      (this.control?.touched || this.control?.value?.length > 0)
    ) {
      console.log(this.control.errors);
      if (this.control.errors["required"])
        this.messageContent = "This value is required.";
      if (this.control.errors["email"]) 
        this.messageContent = "Invalid email format";
      if (this.control.errors["inValidPhone"])
        this.messageContent = "Invalid phone number format";
      this.messageElement = this.renderer.createElement("p");
      const text = this.renderer.createText(this.messageContent);
      this.renderer.appendChild(this.messageElement, text);
      this.messageElement.classList.add("invalid-feedback");
      this.messageElement.style.display = "block";
      this.renderer.appendChild(inputElement.parentNode, this.messageElement);
    }
  }

  // Access the form control associated with this directive
  get control() {
    return this.ngControl.control;
  }
}
