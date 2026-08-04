import { resourcesNav } from "@/constants/navigation-data";
import NavMenu from "./NavMenu";

export const ResourcesMenu = () => {
  return (
    <NavMenu label="Resources">
      {(closeMenu) => (
        <div className="hz-w-full">
          <div className="hz-grid hz-grid-3 hz-gap-5">
            {resourcesNav.map(category => (
              <div key={category.title}>
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-4">{category.title}</h3>
                <div className="hz-stack-4">
                  {category.items.map(item => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="hz-row hz-ai-start hz-inline-3"
                        onClick={closeMenu}
                      >
                        {Icon && <Icon className="hz-sq-3 hz-fg-muted hz-mt-1 hz-link" />}
                        <div className="">
                          <div className="hz-fg-soft hz-w-medium hz-truncate hz-hoverable">{item.title}</div>
                          {item.description && (
                            <div className="hz-t-sm hz-fg-muted hz-truncate">{item.description}</div>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </NavMenu>
  );
};