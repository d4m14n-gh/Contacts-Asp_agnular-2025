using ContactsApi.Data;
using ContactsApi.Dto.Contact;
using ContactsApi.Dto.Mappers;
using ContactsApi.Models;
using ContactsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ContactsApi.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _service;
        public ContactsController(IContactService service)
        {
            _service = service;
        } 

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("categories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCategories() {
            return Ok(await _service.GetAllCategories());
        }

        [HttpGet("categories/{id}/subcategories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllSubCategories(int id)
        {
            return Ok(await _service.GetAllSubCategories(id));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var Contact = await _service.GetById(id);
            if (Contact == null) return NotFound();
            return Ok(Contact);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ContactDto dto)
        {
            if (await _service.EmailExists(dto.Email))
                return BadRequest("Email alreay exists.");
            dto.User = User.Identity?.Name;
            var Contact = await _service.Create(dto);
            return CreatedAtAction(nameof(Get), new { id = Contact.Id }, Contact);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);
            if (!result) 
                return NotFound();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ContactDto dto)
        {
            var old_contact = await _service.GetById(id);
            if (dto.Email != old_contact?.Email && await _service.EmailExists(dto.Email))
                return BadRequest("Email alreay exists.");
            var result = await _service.Delete(id);
            var contact = await _service.Create(dto);
            if (!result)
                return NotFound();
            return Ok(contact);
        }

    }

}
