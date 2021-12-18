import ReactDOM from "react-dom";

import Toast, { ToastProps } from './Toast';
import { uuid } from '../../util';
import './ToastNotification.css';

interface ToastOptions {
  id?: string;
  message: string;
}

export class ToastManager {
  private containerRef: HTMLDivElement;
  private toasts: ToastProps[] = [];

  constructor() {
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const toastContainer = document.createElement("div") as HTMLDivElement;
    toastContainer.id = "toastContainer";
    body.insertAdjacentElement("beforeend", toastContainer);
    this.containerRef = toastContainer;
  } 

  public show(options: ToastOptions): void {
    const toastId = uuid();
    const toast: ToastProps = {
      id: toastId,
      ...options,
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastList = this.toasts.map((toastProps: ToastProps) => (
      <Toast key={toastProps.id} {...toastProps} />
    ));
    ReactDOM.render(toastList, this.containerRef);
  }
}

export const toast = new ToastManager();
