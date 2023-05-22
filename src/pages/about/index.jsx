import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLongArrowAltLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  avatar_1,
  avatar_2,
  avatar_3,
  avatar_4,
  avatar_5,
  team_img,
} from '../../assets';
import routes from '../../routes';
import '../../styles/pages/about.css';

function AboutPage() {
  const members = [
    {
      id: '20127619',
      name: 'Lê Duy Tâm',
      roles: ['Front-end Developer', 'UI/UX Designer'],
      avatar: avatar_1,
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '20127611',
      name: 'Bùi Tấn Sang',
      roles: ['Front-end Developer', 'UI/UX Designer'],
      avatar: avatar_2,
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '20127566',
      name: 'Hoàng Quốc Nam',
      roles: ['Team Leader', 'Full-stack Developer'],
      avatar: avatar_3,
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '20127470',
      name: 'Thân Minh Đức',
      roles: ['Back-end Developer', 'Tester'],
      avatar: avatar_4,
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
    },
  ];

  return (
    <div className='about'>
      <header className='about-header'>
        <img className='about-header__logo' src={team_img} alt='team' />
        <h1 className='about-header__heading'>Our team</h1>
        <p className='about-header__slogan'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text.
        </p>
      </header>

      <main className='about-main'>
        <div className='about__members'>
          {members.map(member => (
            <div className='about__member' key={member.id}>
              <img
                className='about__member-avatar'
                src={member.avatar}
                alt={member.name}
              />

              <div className='about__member-info'>
                <h2 className='about__member-name'>{member.name}</h2>
                <ul className='about__member-roles'>
                  {member.roles.map((role, index) => (
                    <li className='about__member-role' key={index}>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='about__member-socials'>
                <a
                  className='about__member-social'
                  href={member.socials.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaFacebookF className='about-member-social-icon' />
                </a>

                <a
                  className='about__member-social'
                  href={member.socials.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram className='about-member-social-icon' />
                </a>

                <a
                  className='about__member-social'
                  href={member.socials.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedinIn className='about-member-social-icon' />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className='about-footer'>
        <Link className='about__link-to-home' to={routes.home.path}>
          <FaLongArrowAltLeft className='about__link-to-home-icon' />
          Back to home
        </Link>
      </footer>
    </div>
  );
}

export default AboutPage;
