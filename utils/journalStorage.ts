// Simple journal storage utility
interface JournalEntry {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  fileCount: number;
}

class JournalStorage {
  private static instance: JournalStorage;
  private journals: JournalEntry[] = [];
  private listeners: ((journals: JournalEntry[]) => void)[] = [];

  static getInstance(): JournalStorage {
    if (!JournalStorage.instance) {
      JournalStorage.instance = new JournalStorage();
    }
    return JournalStorage.instance;
  }

  addJournal(journal: JournalEntry): void {
    this.journals.unshift(journal); // Add to beginning of array
    this.notifyListeners();
  }

  getJournals(): JournalEntry[] {
    return [...this.journals];
  }

  subscribe(listener: (journals: JournalEntry[]) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.journals]));
  }
}

export default JournalStorage;
export type { JournalEntry };
