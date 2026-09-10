const Header = ({ setquery }: { setquery: (query: string) => void }) => {
  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setquery(e.target.value)}
      />
    </div>
  );
}

export default Header;
