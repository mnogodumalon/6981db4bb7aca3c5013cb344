import { useState, useEffect } from 'react';
import type { Notiz } from '@/types/app';
import { LivingAppsService } from '@/services/livingAppsService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format, parseISO, formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { Plus, FileText, AlertCircle } from 'lucide-react';

// Loading skeleton component
function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Loading */}
      <div className="md:hidden p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-3 py-4">
          <Skeleton className="h-12 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3 pt-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
      {/* Desktop Loading */}
      <div className="hidden md:block">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex">
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          </div>
          <div className="w-72 border-l border-border p-6 space-y-4">
            <Skeleton className="h-16 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ onAddNote }: { onAddNote: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Noch keine Notizen vorhanden
      </h3>
      <p className="text-muted-foreground mb-6">
        Erstelle deine erste Notiz!
      </p>
      <Button onClick={onAddNote}>
        <Plus className="w-4 h-4 mr-2" />
        Neue Notiz
      </Button>
    </div>
  );
}

// Error state component
function ErrorState({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Fehler beim Laden
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {error.message}
      </p>
      <Button variant="outline" onClick={onRetry}>
        Erneut versuchen
      </Button>
    </div>
  );
}

// Note card component
function NoteCard({ note, onClick }: { note: Notiz; onClick: () => void }) {
  const formattedDate = note.fields.datum
    ? format(parseISO(note.fields.datum), 'dd.MM.yyyy', { locale: de })
    : null;

  return (
    <Card
      className="cursor-pointer transition-all duration-150 hover:shadow-md hover:scale-[1.01] bg-card"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground truncate mb-2">
          {note.fields.titel || 'Ohne Titel'}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
          {note.fields.inhalt || 'Kein Inhalt'}
        </p>
        {formattedDate && (
          <p className="text-xs text-muted-foreground text-right">
            {formattedDate}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Add/Edit note form component
function NoteForm({
  note,
  onSave,
  onCancel,
  submitting,
}: {
  note?: Notiz;
  onSave: (data: { titel: string; inhalt: string; datum: string }) => void;
  onCancel: () => void;
  submitting: boolean;
}) {
  const [titel, setTitel] = useState(note?.fields.titel || '');
  const [inhalt, setInhalt] = useState(note?.fields.inhalt || '');
  const [datum, setDatum] = useState(
    note?.fields.datum || format(new Date(), 'yyyy-MM-dd')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ titel, inhalt, datum });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titel">Titel</Label>
        <Input
          id="titel"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
          placeholder="Titel der Notiz"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inhalt">Notizinhalt</Label>
        <Textarea
          id="inhalt"
          value={inhalt}
          onChange={(e) => setInhalt(e.target.value)}
          placeholder="Was möchtest du notieren?"
          rows={5}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="datum">Datum</Label>
        <Input
          id="datum"
          type="date"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Abbrechen
        </Button>
        <Button type="submit" disabled={submitting} className="flex-1">
          {submitting ? 'Speichern...' : 'Speichern'}
        </Button>
      </div>
    </form>
  );
}

// View/Edit note dialog
function NoteDetailDialog({
  note,
  open,
  onOpenChange,
  onUpdate,
  onDelete,
}: {
  note: Notiz | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, data: { titel: string; inhalt: string; datum: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!note) return null;

  const handleSave = async (data: { titel: string; inhalt: string; datum: string }) => {
    setSubmitting(true);
    try {
      await onUpdate(note.record_id, data);
      setEditing(false);
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Notiz wirklich löschen?')) return;
    setDeleting(true);
    try {
      await onDelete(note.record_id);
      onOpenChange(false);
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = note.fields.datum
    ? format(parseISO(note.fields.datum), 'PPP', { locale: de })
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editing ? 'Notiz bearbeiten' : note.fields.titel || 'Ohne Titel'}
          </DialogTitle>
        </DialogHeader>
        {editing ? (
          <NoteForm
            note={note}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
            submitting={submitting}
          />
        ) : (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap text-foreground">
              {note.fields.inhalt || 'Kein Inhalt'}
            </div>
            {formattedDate && (
              <p className="text-sm text-muted-foreground">
                Datum: {formattedDate}
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1"
              >
                {deleting ? 'Löschen...' : 'Löschen'}
              </Button>
              <Button onClick={() => setEditing(true)} className="flex-1">
                Bearbeiten
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Notiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Notiz | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await LivingAppsService.getNotiz();
      // Sort by createdat descending (newest first)
      data.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unbekannter Fehler'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (data: { titel: string; inhalt: string; datum: string }) => {
    setSubmitting(true);
    try {
      await LivingAppsService.createNotizEntry({
        titel: data.titel,
        inhalt: data.inhalt,
        datum: data.datum,
      });
      setAddDialogOpen(false);
      await fetchNotes();
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateNote = async (
    id: string,
    data: { titel: string; inhalt: string; datum: string }
  ) => {
    await LivingAppsService.updateNotizEntry(id, {
      titel: data.titel,
      inhalt: data.inhalt,
      datum: data.datum,
    });
    await fetchNotes();
  };

  const handleDeleteNote = async (id: string) => {
    await LivingAppsService.deleteNotizEntry(id);
    await fetchNotes();
  };

  const openNoteDetail = (note: Notiz) => {
    setSelectedNote(note);
    setDetailDialogOpen(true);
  };

  // Get most recent activity
  const mostRecentDate = notes.length > 0
    ? formatDistance(parseISO(notes[0].createdat), new Date(), {
        addSuffix: true,
        locale: de,
      })
    : null;

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchNotes} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="p-4 pb-0">
          <h1 className="text-xl font-semibold text-foreground">Notizzettel</h1>
        </header>

        {/* Mobile Hero Section */}
        <div className="px-4 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-primary">{notes.length}</span>
            <span className="text-muted-foreground text-sm">Notizen</span>
          </div>
        </div>

        {/* Separator */}
        <div className="mx-4 h-px bg-border" />

        {/* Mobile Notes List */}
        <div className="flex-1 p-4 space-y-3 pb-24">
          {notes.length === 0 ? (
            <EmptyState onAddNote={() => setAddDialogOpen(true)} />
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.record_id}
                note={note}
                onClick={() => openNoteDetail(note)}
              />
            ))
          )}
        </div>

        {/* Mobile Fixed Bottom Action */}
        {notes.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full h-14 text-base rounded-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Neue Notiz
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Neue Notiz erstellen</DialogTitle>
                </DialogHeader>
                <NoteForm
                  onSave={handleAddNote}
                  onCancel={() => setAddDialogOpen(false)}
                  submitting={submitting}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col min-h-screen">
        {/* Desktop Header */}
        <header className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Notizzettel</h1>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Neue Notiz
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Neue Notiz erstellen</DialogTitle>
              </DialogHeader>
              <NoteForm
                onSave={handleAddNote}
                onCancel={() => setAddDialogOpen(false)}
                submitting={submitting}
              />
            </DialogContent>
          </Dialog>
        </header>

        {/* Desktop Main Content */}
        <div className="flex flex-1">
          {/* Main Area - Notes Grid (70%) */}
          <main className="flex-1 p-6">
            {notes.length === 0 ? (
              <EmptyState onAddNote={() => setAddDialogOpen(true)} />
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note, index) => (
                  <div
                    key={note.record_id}
                    className={index === 0 && notes.length >= 3 ? 'lg:col-span-2' : ''}
                  >
                    <NoteCard note={note} onClick={() => openNoteDetail(note)} />
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* Sidebar - Stats (30%) */}
          <aside className="w-72 border-l border-border p-6 bg-card/50">
            {/* Hero Stat */}
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary">{notes.length}</div>
              <div className="text-muted-foreground text-sm mt-1">Notizen insgesamt</div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border mb-6" />

            {/* Secondary Stats */}
            {mostRecentDate && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Letzte Notiz</div>
                <div className="text-foreground font-medium">{mostRecentDate}</div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Note Detail Dialog (shared) */}
      <NoteDetailDialog
        note={selectedNote}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}
