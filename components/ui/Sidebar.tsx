import { Fragment, useState, SVGProps, FC, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { AuthContext } from '@context/auth'
import { toast } from 'react-toastify'
import { toast as toastUtils, paths } from '@utils'

export interface INavigation {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined; }) => JSX.Element;
}

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ')

interface Props {
  children: React.ReactNode;
  navigation: INavigation[];
  profilePageHref?: string;
}

export const Sidebar: FC<Props> = ({ children, navigation, profilePageHref }) => {
  const { user, logout } = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  if (!user) {
    return <></>
  }

  const navigationIsActive = (href: string): boolean => {
    return pathname === href
  }

  const userProfilePic = (): JSX.Element => {
    const arrName = user.name.split(' ')

    return (
      <div className='h-9 w-9 flex items-center justify-center bg-gray-400 rounded-full text-sm text-white'>
        {arrName[0].charAt(0).toUpperCase()}
        {arrName[1]?.charAt(0).toUpperCase()}
      </div>
    )
  }

  const handleLogout = async () => {
    const { success, message } = await logout()

    if (success) {
      router.replace(paths.auth.login)
    } else {
      toast.error(message, toastUtils.config)
    }
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 lg:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-gray-800'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
                    <div className='flex flex-shrink-0 items-center px-4'>
                      <Image
                        src='https://lightit.io/images/Logo.svg'
                        alt='Light-it'
                        width={50}
                        height={36}
                        priority
                      />
                    </div>
                    <nav className='mt-5 space-y-1 px-2'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            navigationIsActive(item.href)
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              navigationIsActive(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className='flex flex-shrink-0 bg-gray-700 p-4'>
                    <a href='#' className='group block flex-shrink-0'>
                      <div className='flex items-center'>
                        <div>
                          <Image
                            className='inline-block h-10 w-10 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </div>
                        <div className='ml-3'>
                          <p className='text-base font-medium text-white'>{user?.name}</p>
                          <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300'>View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0'>{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex min-h-0 flex-1 flex-col bg-gray-800'>
            <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
              <div className='flex flex-shrink-0 items-center px-4'>
                <Image
                  className='h-8 w-auto'
                  src='https://lightit.io/images/Logo.svg'
                  alt='Light-it'
                  width={50}
                  height={36}
                  priority
                />
              </div>
              <nav className='mt-5 flex-1 space-y-1 px-2'>
                {navigation.map((item: INavigation) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      navigationIsActive(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        navigationIsActive(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className='flex flex-shrink-0 bg-gray-700 p-4 group block w-full flex-shrink-0'>
              <div className='flex items-center'>
                {
                  profilePageHref
                    ? <Link href={profilePageHref}>{userProfilePic()}</Link>
                    : userProfilePic()
                }
                <div className='ml-3'>
                  <p className='text-sm font-medium text-white'>{user?.name}</p>
                  <button
                    className='text-xs font-medium text-gray-300 hover:text-gray-200'
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col lg:pl-64'>
          <div className='sticky top-0 z-10 bg-gray-100 p-1 lg:hidden'>
            <button
              type='button'
              className='-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
