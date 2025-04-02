import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Edit, Trash, Plus, X, Users, DollarSign, Clock, PenSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Calendar } from '@/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';




interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  capacity: number;
  description: string;
}

const HostCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: date ? date : new Date(),
    time: '',
    location: '',
    price: 0,
    capacity: 0,
    description: '',
  });
  const { toast } = useToast();

  const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setNewEvent({ ...newEvent, date: newDate ? newDate : new Date() });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.time || !newEvent.location || !newEvent.price || !newEvent.capacity || !newEvent.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newEventWithId: Event = {
      id: Math.random().toString(36).substring(7),
      ...newEvent,
      date: newEvent.date,
      price: parseFloat(newEvent.price.toString()),
      capacity: parseInt(newEvent.capacity.toString()),
    };

    setEvents([...events, newEventWithId]);
    setOpen(false);
    setNewEvent({
      title: '',
      date: date ? date : new Date(),
      time: '',
      location: '',
      price: 0,
      capacity: 0,
      description: '',
    });

    toast({
      title: "Success",
      description: "Event created successfully.",
    });
  };

  const handleEditEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editEvent) {
      setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    }
  };

  const handleOpenEditDialog = (event: Event) => {
    setEditEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!editEvent?.title || !editEvent?.time || !editEvent?.location || !editEvent?.price || !editEvent?.capacity || !editEvent?.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedEvents = events.map(event => {
      if (event.id === editEvent?.id) {
        return {
          ...editEvent,
          price: parseFloat(editEvent.price.toString()),
          capacity: parseInt(editEvent.capacity.toString()),
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setIsEditDialogOpen(false);
    setEditEvent(null);

    toast({
      title: "Success",
      description: "Event saved successfully.",
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setIsEditDialogOpen(false);
    setEditEvent(null);

    toast({
      title: "Success",
      description: "Event deleted successfully.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button onClick={() => setOpen(true)} className="bg-[#FFC500] hover:bg-[#e6b000] text-black gap-2">
          <Plus size={16} />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal border border-black/10" +
                  (date ? "pl-3.5" : "text-muted-foreground")
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                {date ? date.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-2" align="start" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 h-52">
          <h2 className="text-lg font-semibold mb-2">Events on {date ? date.toLocaleDateString() : 'Selected Date'}</h2>
          <ul className="overflow-y-auto h-40">
            {events.filter(event => event.date && event.date.toLocaleDateString() === date?.toLocaleDateString()).length > 0 ? (
              events.filter(event => event.date && event.date.toLocaleDateString() === date?.toLocaleDateString()).map((event) => (
                <li key={event.id} className="py-2 border-b border-gray-200 last:border-none flex items-center justify-between">
                  <span>{event.title} at {event.time}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No events on this day.</li>
            )}
          </ul>
        </div>
      </div>

      {/* New Event Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className=' text-white'>Add New Event</DialogTitle>
            <DialogDescription className=' text-white'>
              Create a new event for your listing.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Title
              </label>
              <Input type="text" name="title" id="title" value={newEvent.title} onChange={handleNewEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Date
              </label>
              <Input
                type="text"
                name="date"
                id="date"
                value={date ? date.toLocaleDateString() : ''}
                className="col-span-3 cursor-not-allowed"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Time
              </label>
              <Input type="time" name="time" id="time" value={newEvent.time} onChange={handleNewEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Location
              </label>
              <Input type="text" name="location" id="location" value={newEvent.location} onChange={handleNewEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Price
              </label>
              <Input type="number" name="price" id="price" value={newEvent.price} onChange={handleNewEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="capacity" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Capacity
              </label>
              <Input type="number" name="capacity" id="capacity" value={newEvent.capacity} onChange={handleNewEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Description
              </label>
              <Textarea name="description" id="description" value={newEvent.description} onChange={handleNewEventChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateEvent}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Edit the details of your event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Title
              </label>
              <Input type="text" name="title" id="title" value={editEvent?.title || ''} onChange={handleEditEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Date
              </label>
              <Input
                type="text"
                name="date"
                id="date"
                value={editEvent?.date ? editEvent?.date.toLocaleDateString() : ''}
                className="col-span-3 cursor-not-allowed"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Time
              </label>
              <Input type="time" name="time" id="time" value={editEvent?.time || ''} onChange={handleEditEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Location
              </label>
              <Input type="text" name="location" id="location" value={editEvent?.location || ''} onChange={handleEditEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Price
              </label>
              <Input type="number" name="price" id="price" value={editEvent?.price || 0} onChange={handleEditEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="capacity" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Capacity
              </label>
              <Input type="number" name="capacity" id="capacity" value={editEvent?.capacity || 0} onChange={handleEditEventChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium leading-none text-black col-span-1">
                Description
              </label>
              <Textarea name="description" id="description" value={editEvent?.description || ''} onChange={handleEditEventChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="destructive" onClick={() => {
              if (editEvent) {
                handleDeleteEvent(editEvent.id);
              }
            }}>
              Delete
            </Button>
            <div className="flex-grow"></div>
            <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default HostCalendar;
