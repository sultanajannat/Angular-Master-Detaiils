using ExamAngular03.Models;
using ExamAngular03.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ExamAngular03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly CandidateDbContext _context;
        private readonly IWebHostEnvironment _env;
        public CandidatesController(CandidateDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this._env = env;
        }

        [HttpGet]
        [Route("GetSkills")]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        [HttpGet]
        [Route("GetCandidates")]
        public async Task<ActionResult<IEnumerable<Candidate>>> GetCandidates()
        {
            return await _context.Candidates.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<candidateVM>>> GetCandidateSkills()
        {
            List<candidateVM> candidateSkills = new List<candidateVM>();

            var allCandidates = _context.Candidates.ToList();
            foreach (var candidate in allCandidates)
            {
                var skillList = _context.CandidateSkills.Where(x => x.CandidateId == candidate.CandidateId).Select(x => new Skill { SkillId = x.SkillId }).ToList();
                candidateSkills.Add(new candidateVM
                {
                    CandidateId = candidate.CandidateId,
                    CandidateName = candidate.CandidateName,
                    BirthDate = candidate.BirthDate,
                    PhoneNo = candidate.PhoneNo,
                    Fresher = candidate.Fresher,
                    Picture = candidate.Picture,
                    SkillList = skillList.ToArray()
                });
            }
            return candidateSkills;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<candidateVM>> GetCandidates(int id)
        {
            Candidate candidate = await _context.Candidates.FindAsync(id);
            Skill[] skillList = _context.CandidateSkills.Where(x => x.CandidateId == candidate.CandidateId).Select(x => new Skill { SkillId = x.SkillId }).ToArray();

            candidateVM candidatevm = new candidateVM()
            {
                CandidateId = candidate.CandidateId,
                CandidateName = candidate.CandidateName,
                BirthDate = candidate.BirthDate,
                PhoneNo = candidate.PhoneNo,
                Fresher = candidate.Fresher,
                Picture = candidate.Picture,
                SkillList = skillList
            };
            return candidatevm;
        }

        [HttpPost]
        public async Task<ActionResult<CandidateSkill>> PostCandidateSkills([FromForm] candidateVM VM)
        {
            var skillItems = JsonConvert.DeserializeObject<Skill[]>(VM.skillsStringify);

            Candidate candidate = new Candidate
            {
                CandidateName = VM.CandidateName,
                BirthDate = VM.BirthDate,
                PhoneNo = VM.PhoneNo,
                Fresher = VM.Fresher
            };

            //if (VM.PictureFile != null)
            //{
            //    var webroot = _env.WebRootPath;
            //    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(VM.PictureFile.FileName);
            //    var filePath = Path.Combine(webroot, "Images", fileName);

            //    FileStream fileStream = new FileStream(filePath, FileMode.Create);
            //    await VM.PictureFile.CopyToAsync(fileStream);
            //    await fileStream.FlushAsync();
            //    fileStream.Close();
            //    candidate.Picture = fileName;
            //}

            if (VM.PictureFile != null && VM.PictureFile.Length > 0)
            {
                // The user provided a picture, so save it
                var webroot = _env.WebRootPath;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(VM.PictureFile.FileName);
                var filePath = Path.Combine(webroot, "Images", fileName);

                using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await VM.PictureFile.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                }

                candidate.Picture = fileName;
            }
            else
            {
                // The user did not provide a picture, handle it as per your requirement
                // For example, you could set a default picture or leave the 'candidate.Picture' field as null.
                candidate.Picture = "default-picture.jpg";
            }



            foreach (var item in skillItems)
            {
                var candidateskill = new CandidateSkill
                {
                    Candidate = candidate,
                    CandidateId = candidate.CandidateId,
                    SkillId = item.SkillId
                };
                _context.Add(candidateskill);
            }

            await _context.SaveChangesAsync();
            return Ok(candidate);
        }

        [Route("Update")]
        [HttpPost]
        public async Task<ActionResult<CandidateSkill>> UpdateBookingEntry([FromForm] candidateVM vm)
        {
            var skillItems = JsonConvert.DeserializeObject<Skill[]>(vm.skillsStringify);

            Candidate candidate = _context.Candidates.Find(vm.CandidateId);
            candidate.CandidateName = vm.CandidateName;
            candidate.BirthDate = vm.BirthDate;
            candidate.PhoneNo = vm.PhoneNo;
            candidate.Fresher = vm.Fresher;

            if (vm.PictureFile != null)
            {
                var webroot = _env.WebRootPath;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(vm.PictureFile.FileName);
                var filePath = Path.Combine(webroot, "Images", fileName);

                FileStream fileStream = new FileStream(filePath, FileMode.Create);
                await vm.PictureFile.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
                fileStream.Close();
                candidate.Picture = fileName;
            }

            //Delete existing spots
            var existingSkills = _context.CandidateSkills.Where(x => x.CandidateId == candidate.CandidateId).ToList();
            foreach (var item in existingSkills)
            {
                _context.CandidateSkills.Remove(item);
            }

            //Add newly added spots
            foreach (var item in skillItems)
            {
                var candidateSkill = new CandidateSkill
                {
                    CandidateId = candidate.CandidateId,
                    SkillId = item.SkillId
                };
                _context.Add(candidateSkill);
            }

            _context.Entry(candidate).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(candidate);
        }

        [Route("Delete/{id}")]
        [HttpPost]
        public async Task<ActionResult<CandidateSkill>> DeleteCandidateSkill(int id)
        {
            Candidate candidate = _context.Candidates.Find(id);

            var existingSkills = _context.CandidateSkills.Where(x => x.CandidateId == candidate.CandidateId).ToList();
            foreach (var item in existingSkills)
            {
                _context.CandidateSkills.Remove(item);
            }
            _context.Entry(candidate).State = EntityState.Deleted;

            await _context.SaveChangesAsync();

            return Ok(candidate);
        }
    }
}
