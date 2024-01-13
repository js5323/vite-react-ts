import { useState } from "react";
import DayPicker from "./components/DayPicker/DayPicker";

function App() {
  const [day, setDay] = useState<Date | undefined>();

  return (
    <div className='p-4 h-100'>
      <h1 className='mb-4'>Day picker</h1>

      <DayPicker value={day} onChange={(d?: Date) => setDay(d)} />
    </div>
  );
}

export default App;
