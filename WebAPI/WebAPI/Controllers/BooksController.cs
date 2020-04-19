using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class BooksController : ApiController
    {
        private BooksDBEntities db = new BooksDBEntities();

        // GET: api/Books
        [HttpGet]
        [AllowAnonymous]
        public IQueryable<Book> GetBooks()
        {
            var lastFiveBooks = db.Books.OrderByDescending(b => b.BookID).Take(5);
            return lastFiveBooks;
        }

        [HttpGet]
        [Route("api/search/{term}")]
        [AllowAnonymous]
        public IQueryable<Book> Search(string term)
        {
            var searchResult = db.Books.Where(o => o.Title.Contains(term) ||
            o.Author.Contains(term) ||
            o.Description.Contains(term));

            return searchResult;
        }

        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        [AllowAnonymous]
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (id != book.BookID)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        [ResponseType(typeof(Book))]
        [AllowAnonymous]
        public IHttpActionResult PostBook(Book book)
        {

            db.Books.Add(book);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = book.BookID }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        [AllowAnonymous]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.BookID == id) > 0;
        }
    }
}