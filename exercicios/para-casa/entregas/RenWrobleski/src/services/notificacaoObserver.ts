interface Observer {
  update(message: string): void;
}

class NotificacaoObserver implements Observer {
  update(message: string): void {
    console.log(`Notificação: ${message}`);
  }
}

class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }
}
