function NotFoundPage(): JSX.Element {
  return (
    <section className="not-found-page" style={{textAlign: 'center', marginTop: '100px'}}>
      <h1>404. Page not found</h1>
      <a href="/" style={{textUnderlineOffset: '7px'}}>Вернуться на главную</a>
    </section>
  );
}

export default NotFoundPage;
