const Header = ({ role }) => {
  return (
    <>
      <header>
        <h1 className="color-change">
          Welcome, <output>{role.name}</output>
        </h1>
        <div className="balance color-change">
          Available Credit: <output>{role.balance}</output>
        </div>
      </header>
    </>
  );
};

export default Header;
