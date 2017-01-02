<?php
/**
 * Copyright (C) 2015 Digimedia Sp. z o.o. d/b/a Clearcode
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

namespace Features\Context;

use Behat\MinkExtension\Context\MinkContext;

/**
 * Class InstallerContext
 * @package Features\Context\Fixtures
 */
class InstallerContext extends MinkContext
{
    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct()
    {

    }


    /**
     * @When /^(?:|I )should see disabled Continue button$/
     */
    public function shouldSeeDisabledButton()
    {
        $this->assertElementOnPage(".btn.btn-success.disabled");

    }

    /**
     * @When /^(?:|I )fill email field with "([^"]*)"$/
     */
    public function fillEmailField($email)
    {
        $this->fillField("user_email", $email);
    }

    /**
     * @When /^(?:|I )fill password field with "([^"]*)"$/
     */
    public function fillPasswordField($user_pass)
    {
        $this->fillField("user_password_first", $user_pass);
    }

    /**
     * @When /^(?:|I )fill confirm password field with "([^"]*)"$/
     */
    public function fillRepeatUserPasswordField($repeat_user_pass)
    {
        $this->fillField("user_password_second", $repeat_user_pass);
    }


    /**
     * @When /^(?:|I )fill hostname field with "([^"]*)"$/
     */
    public function fillHostnameField($hostname)
    {
        $this->fillField("database_hostname", $hostname);
    }

    /**
     * @When /^(?:|I )fill database name field with "([^"]*)"$/
     */
    public function fillNameDatabaseField($name_database)
    {
        $this->fillField("database_name", $name_database);
    }

    /**
     * @When /^(?:|I )fill user name field with "([^"]*)"$/
     */
    public function fillUserNameField($username)
    {
        $this->fillField("database_username", $username);
    }

    /**
     * @When /^(?:|I )fill user password field with "([^"]*)"$/
     */
    public function fillUserPasswordField($password)
    {
        $this->fillField("database_password", $password);
    }

    /**
     * @Then /^(?:|I )should see correct setup System$/
     */
    public function shouldSeeCorrectSetupSystem()
    {
        $this->assertElementOnPage("body div.container div div div div:nth-child(2) span.pull-right.glyphicon.glyphicon-ok");
    }

    /**
     * @Then /^(?:|I )should see in database setting form validation "([^"]*)" field$/
     */
    public function shouldSeeErrorInDatabaseForm($error)
    {
        switch ($error) {
            case "hostname":
                $id_error = "body div.container div div form div div:nth-child(2) span ul li";
                break;
            case "database_name":
                $id_error = "body div.container div div form div div:nth-child(3) span ul li";
                break;
            case "database_username":
                $id_error = "body div.container div div form div div:nth-child(4) span ul li";
                break;
            case "database_pass":
                $id_error = "div.stg-notification.stg-notification-danger.center-block";
                break;
        }
        $this->assertElementOnPage($id_error);
    }

    /**
     * @Then /^(?:|I )should see in create admin form validation "([^"]*)" field$/
     */
    public function shouldSeeErrorInUserAdminForm($error)
    {

        switch ($error) {
            case "email":
                $id_error = "body div.container div div form div div:nth-child(2) span ul li";
                break;
            case "password":
                $id_error = "body div.container div div form div div:nth-child(3) span li";
                break;


        }

        $this->assertElementOnPage($id_error);
    }

    /**
     * @Then /^(?:|I )should see correct setup Php Version$/
     */
    public function shouldSeeCorrectPhpVersion()
    {
        $this->assertElementOnPage("body div.container div div div div:nth-child(3) span.pull-right.glyphicon.glyphicon-ok");
    }

    /**
     * @Then /^(?:|I )should see error setup Database$/
     */
    public function shouldSeeErrorSetupDatabase()
    {
        $this->assertElementOnPage("body div.container div div div div:nth-child(4) span.pull-right.glyphicon-remove");
    }

    /**
     * @Then /^(?:|I )should see correct setup Database$/
     */
    public function shouldSeeCorrectSetupDatabase()
    {
        $this->assertElementOnPage("body div.container div div div div:nth-child(4) span.pull-right.glyphicon.glyphicon-ok");
    }

    /**
     * @Then /^(?:|I )click Continue button$/
     */
    public function clickContinueButton()
    {
        $this->clickElement(".btn.btn-success");
    }

    /**
     * @Then /^(?:|I )click Start button$/
     */
    public function clickStartButton()
    {
        $this->clickElement("a.btn.btn-block.btn-success");
    }

    /**
     * @When /^I wait ([^"]*) seconds?$/
     */
    public function iWaitSeconds($time)
    {
        sleep($time);
    }

    /**
     * @When /^(?:|I )select option "([^"]*)" in "([^"]*)"$/
     */
    public function iSelectOption($option, $select)
    {
        $element = $this->getSession()
            ->getPage()
            ->find("css", $select);

        if ($element == null) {
            throw new ElementNotFoundException($this->getSession(), 'element', 'css', $select);
        }

        $option = $this->fixStepArgument($option);
        $element->selectOption($option, false);
    }

    /**
     * @When /^(?:|I )click element "(?P<element>(?:[^"]|\\")*)"$/
     */
    public function clickElement($element)
    {
        $element = $this->getSession()->getPage()->find('css', $element);

        if (!$element) {
            throw new ElementNotFoundException($this->getSession());
        }

        $element->click();
    }

    /**
     * @When /^(?:|I )click xpath element "([^"]*)"$/
     */
    public function iClickXpathElement($locator)
    {
        $element = $this->getSession()
            ->getPage()
            ->find("xpath", $locator);

        if ($element == null) {
            throw new ElementNotFoundException($this->getSession(), 'element', 'xpath', $locator);
        }

        $element->click();
    }

    /**
     * @When /^(?:|I )will wait to see element "([^"]*)"(?:| maximum (\d+) seconds)$/
     * @Then /^(?:|I )should see element "([^"]*)" after time$/
     */
    public function iWaitForElement($locator, $maxWait = null)
    {

        if (!$maxWait) {
            $maxWait = $this->maxWait;
        }

        $tick = 250000;
        $timeout = time() + $maxWait;

        $page = $element = $this->getSession()->getPage();

        while (time() < $timeout) {
            usleep($tick);

            $element = $page->find('css', $locator);

            if ($element && $element->isVisible()) {
                return $element;
            }
        }

        if ($element == null) {
            throw new ElementNotFoundException($this->getSession(), 'element', 'css', $locator);
        }

        $message = sprintf('The element "%s" found but is not visible.', $locator);
        throw new ExpectationException($message, $this->getSession());
    }


    //SELENIUM DRIVER CONTEXT

    /** @BeforeScenario */
    public function before($event)
    {
        // exec("ant setup-database");
        $this->getMink()->getSession();
        $this->getSession()->resizeWindow(1920, 1080, 'current');


    }

    /** @AfterScenario */
    public function after($event)
    {
        $this->getMink()->stopSessions();
    }


}
