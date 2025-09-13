// Simple journal storage utility
export interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
}

export interface JournalEntry {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  fileCount: number;
  mediaItems?: MediaItem[];
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

  updateJournal(updatedJournal: JournalEntry): void {
    const index = this.journals.findIndex(journal => journal.id === updatedJournal.id);
    if (index !== -1) {
      this.journals[index] = updatedJournal;
      this.notifyListeners();
    }
  }

  deleteJournal(journalId: string): void {
    this.journals = this.journals.filter(journal => journal.id !== journalId);
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
