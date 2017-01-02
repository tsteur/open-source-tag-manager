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

namespace SevenTag\Api\ContainerBundle\Tests\NoScript;

use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\ContainerBundle\NoScript\DefaultNoScriptInterceptor;
use SevenTag\Api\ContainerBundle\NoScript\NoScriptCrawler;
use SevenTag\Component\Tag\Model\Tag;

class DefaultNoScriptInterceptorTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itInterceptContainerNoScripts()
    {
        $container = new Container();

        $code1 = <<<EOD
<noscript><p><img src="http://piwik-server.com/piwik.php?idsite=1" style="border:0" alt="" /></p></noscript>
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//piwik-server.com/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 1]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Piwik Code -->
EOD;

        $tag1 = new Tag();
        $tag1->setCode($code1);
        $container->addTag($tag1);

        $code2 = <<<EOD
<noscript>
    <iframe src="http://7tag.org"></iframe>
    <img src="http://7tag.org/favicon.png"/>
    <div>
        <p>Info</p>
        <div>
            <img src="http://7tag.org/favicon2.png"/>
        </div>
    </div>
</noscript>
EOD;

        $tag2 = new Tag();
        $tag2->setCode($code2);
        $container->addTag($tag2);

        $interceptor = new DefaultNoScriptInterceptor(new NoScriptCrawler());

        // @codingStandardsIgnoreStart
        $this->assertEquals("<p><img src=\"http://piwik-server.com/piwik.php?idsite=1\" style=\"border:0\" alt=\"\"></p><iframe src=\"http://7tag.org\"></iframe><img src=\"http://7tag.org/favicon.png\"><div>
        <p>Info</p>
        <div>
            <img src=\"http://7tag.org/favicon2.png\">
</div>
    </div>", $interceptor->intercept($container));
        // @codingStandardsIgnoreEnd
    }
}
