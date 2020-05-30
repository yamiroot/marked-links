/* 

  it('Si es una ruta inválida debería retornar un error.',
  (done) => responseValidate(path.join(process.cwd(), 'Markdown', 'Readme.md')).catch((response) => {
    expect(response).toStrictEqual(new Error('La ruta ingresada no existe.'));
    done();
  })); */