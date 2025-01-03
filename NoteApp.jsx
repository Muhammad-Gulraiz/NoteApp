import React, { useEffect, useState } from "react";
import "../styleCss/president.css";

// یہ ایپلیکیشن صارف کو رنگین نوٹس بنانے، انہیں اپ ڈیٹ کرنے، اور ضرورت پڑنے پر حذف کرنے کی سہولت فراہم کرتی ہے۔

function President() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );
  const [showButtons, setShowButtons] = useState(false);

  const addNote = (color) => {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };
  // یہ فنکشن ایک نئی نوٹ کو ایک مخصوص رنگ کے ساتھ نوٹس کی فہرست میں شامل کرنے کے لیے استعمال ہوتا ہے۔ اگر آپ ایک نوٹ ایپ بنا رہے ہیں، تو یہ کوڈ اس ایپ کے بنیادی کام کو ممکن بناتا ہے۔

  const deleteNote = (id) => {
    const tempNotes = notes.filter((note) => note.id !== id);
    setNotes(tempNotes);
  };
  // جب deleteNote کو کال کیا جاتا ہے تو یہ نوٹس کی فہرست میں سے مطلوبہ نوٹ کو ہٹا دیتا ہے اور اپڈیٹڈ فہرست کو سیٹ کر دیتا ہے۔

  const updateText = (text, id) => {
    const tempNotes = notes.map((note) =>
      note.id === id ? { ...note, text } : note
    );
    setNotes(tempNotes);
  };
  // یہ فنکشن نوٹس کی فہرست میں کسی مخصوص نوٹ کو تلاش کرتا ہے اور اس کی تحریر کو نئی تحریر سے بدل دیتا ہے

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);
  // اگر آپ کے پاس نوٹس کی ایک ایپ ہے جہاں صارف کچھ نوٹس لکھتا ہے، تو یہ کوڈ یقینی بناتا ہے کہ وہ نوٹس براؤزر میں محفوظ ہو جائیں۔ جب صارف دوبارہ ایپ کھولے گا تو محفوظ شدہ نوٹس localStorage سے لوڈ کیے جا سکتے ہیں۔
  return (
    <div className="president">
      <div className="sidebar">
        <button
          className="circle-btn toggle-btn"
          onClick={() => setShowButtons(!showButtons)}
        // !showButtons: یہ showButtons کی موجودہ حالت کو پلٹ دیتا ہے۔ اگر showButtons true تھا تو یہ اسے false بنا دے گا، اور اگر false تھا تو اسے true کر دے گا۔
        >
          +
        </button>

        {showButtons && (
          <>
            <button
              className="circle-btn"
              style={{ backgroundColor: "#FFD700" }}
              onClick={() => addNote("#FFD700")}
            />
            <button
              className="circle-btn"
              style={{ backgroundColor: "#FF6347" }}
              onClick={() => addNote("#FF6347")}
            />
            <button
              className="circle-btn"
              style={{ backgroundColor: "#90EE90" }}
              onClick={() => addNote("#90EE90")}
            />
          </>
        )}
        {/* یہ کوڈ ایسے بٹن رینڈر کرتا ہے جو کلک کرنے پر کسی مخصوص رنگ کے ساتھ کوئی نوٹ یا ایکشن ایڈ کریں گے۔
آپ addNote فنکشن میں دیکھ سکتے ہیں کہ یہ فنکشن کلک ہونے پر کیا کرتا ہے۔ */}

      </div>
      <div className="note-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            <textarea
              value={note.text}
              onChange={(e) => updateText(e.target.value, note.id)}
              placeholder="Write your note here..."

            // جب صارف textarea میں کچھ لکھتا ہے۔ جب بھی ٹیکسٹ میں تبدیلی آتی ہے، updateText فنکشن کو کال کیا جاتا ہے جسے دو پیرامیٹرز ملتے ہیں:
            // e.target.value: اس سے textarea میں جو نیا ٹیکسٹ ہوگا، وہ حاصل کیا جاتا ہے

            />
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
        {/* یہ کوڈ dynamically notes کو render کرتا ہے اور آپ کو ہر note کو edit یا delete کرنے کی سہولت فراہم کرتا ہے
        */}

      </div>
    </div>
  );
}

export default President;
