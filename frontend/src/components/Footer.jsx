export default function Footer() {
  return (
    <footer style={{ padding: 24, borderTop: "1px solid #e8e8e8", marginTop: 24, opacity: 0.8 }}>
      © {new Date().getFullYear()} CarBooking
    </footer>
  );
}

